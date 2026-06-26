import { useEffect, useRef, useState } from 'react'

type Props = {
  projectId: string
  seed: string
  intensity: number
  tags?: string[]
  native?: string
  translation?: string
}

interface Tip {
  x: number
  y: number
  vx: number
  vy: number
  thickness: number
  color: string
  shape: string
  life: number
  maxLife: number
  generation: number
  rng: () => number
}

// Deterministic string -> uint32 hash (djb2 variant)
function hashStringToUint32(str: string) {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i)
  }
  return h >>> 0
}

// xorshift32 PRNG
function makeRng(seed: number) {
  let x = seed || 123456789
  return function rng() {
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    return (x >>> 0) / 4294967295
  }
}

// Draw silhouette of the leaf or flower in a single solid color
function drawSilhouette(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  shape: string,
  size: number,
  color: string,
) {
  ctx.fillStyle = color
  ctx.strokeStyle = color

  switch (shape) {
    case 'lotus': {
      ctx.beginPath()
      // Draw 3 overlapping petals pointing up
      ctx.ellipse(px, py - size * 0.4, size * 0.4, size * 0.8, 0, 0, 2 * Math.PI)
      ctx.ellipse(
        px - size * 0.3,
        py - size * 0.2,
        size * 0.3,
        size * 0.7,
        -Math.PI / 6,
        0,
        2 * Math.PI,
      )
      ctx.ellipse(
        px + size * 0.3,
        py - size * 0.2,
        size * 0.3,
        size * 0.7,
        Math.PI / 6,
        0,
        2 * Math.PI,
      )
      ctx.fill()
      break
    }
    case 'sunflower': {
      // Radial petals
      for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 4) {
        const petalX = px + Math.cos(angle) * size * 0.5
        const petalY = py + Math.sin(angle) * size * 0.5
        ctx.beginPath()
        ctx.arc(petalX, petalY, size * 0.25, 0, 2 * Math.PI)
        ctx.fill()
      }
      // Center seed disc in the same color
      ctx.beginPath()
      ctx.arc(px, py, size * 0.35, 0, 2 * Math.PI)
      ctx.fill()
      break
    }
    case 'hibiscus': {
      // 5 overlapping round petals
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5
        const petalX = px + Math.cos(angle) * size * 0.4
        const petalY = py + Math.sin(angle) * size * 0.4
        ctx.beginPath()
        ctx.arc(petalX, petalY, size * 0.4, 0, 2 * Math.PI)
        ctx.fill()
      }
      // Long stamen in the same color
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(px + size * 0.8, py - size * 0.4)
      ctx.stroke()
      // Stamen head
      ctx.beginPath()
      ctx.arc(px + size * 0.8, py - size * 0.4, size * 0.15, 0, 2 * Math.PI)
      ctx.fill()
      break
    }
    case 'orchid': {
      // Outer sepals
      const sepalAngles = [-Math.PI / 2, Math.PI / 3, (2 * Math.PI) / 3]
      sepalAngles.forEach((angle) => {
        ctx.beginPath()
        ctx.ellipse(
          px + Math.cos(angle) * size * 0.4,
          py + Math.sin(angle) * size * 0.4,
          size * 0.3,
          size * 0.5,
          angle,
          0,
          2 * Math.PI,
        )
        ctx.fill()
      })
      // Inner petals
      const petalAngles = [-Math.PI / 6, (7 * Math.PI) / 6]
      petalAngles.forEach((angle) => {
        ctx.beginPath()
        ctx.ellipse(
          px + Math.cos(angle) * size * 0.4,
          py + Math.sin(angle) * size * 0.4,
          size * 0.4,
          size * 0.4,
          angle,
          0,
          2 * Math.PI,
        )
        ctx.fill()
      })
      // Center orchid lip in the same color
      ctx.beginPath()
      ctx.ellipse(px, py + size * 0.3, size * 0.4, size * 0.45, 0, 0, 2 * Math.PI)
      ctx.fill()
      break
    }
    case 'maple_leaf': {
      ctx.beginPath()
      // Draw 3 maple-like lobes
      ctx.ellipse(px, py - size * 0.4, size * 0.25, size * 0.7, 0, 0, 2 * Math.PI)
      ctx.ellipse(
        px - size * 0.3,
        py - size * 0.1,
        size * 0.2,
        size * 0.55,
        -Math.PI / 4,
        0,
        2 * Math.PI,
      )
      ctx.ellipse(
        px + size * 0.3,
        py - size * 0.1,
        size * 0.2,
        size * 0.55,
        Math.PI / 4,
        0,
        2 * Math.PI,
      )
      ctx.fill()
      break
    }
    case 'oval_leaf': {
      ctx.beginPath()
      ctx.ellipse(px, py, size * 0.35, size * 0.65, -Math.PI / 6, 0, 2 * Math.PI)
      ctx.fill()
      break
    }
    case 'lanceolate_leaf': {
      ctx.beginPath()
      ctx.ellipse(px, py, size * 0.18, size * 0.85, Math.PI / 6, 0, 2 * Math.PI)
      ctx.fill()
      break
    }
    default: {
      ctx.fillRect(px, py, 1, 1)
    }
  }
}

export default function FractalGarden({
  projectId,
  seed,
  intensity,
  tags = [],
  native = '',
  translation = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const prevProjectIdRef = useRef<string | null>(null)
  const branchHistoryRef = useRef<{ x: number; y: number }[]>([])

  // Spatial occupancy grid to steer branches away from crowded spots into empty space
  const gridRef = useRef<number[]>([])
  const colsRef = useRef<number>(0)
  const rowsRef = useRef<number>(0)
  const cellSize = 30

  // Handle canvas resizing and initialization (clears the canvas and history)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)

      const cols = Math.ceil(width / cellSize)
      const rows = Math.ceil(height / cellSize)
      gridRef.current = new Array(cols * rows).fill(0)
      colsRef.current = cols
      rowsRef.current = rows

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, width, height)
        branchHistoryRef.current = []
      }
      setDimensions({ width, height })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Handle drawing/simulation of growing vines (accumulates, clears on song change)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const { width, height } = dimensions
    if (width === 0 || height === 0) return

    // Clear canvas, history, and occupancy grid when project switches
    if (prevProjectIdRef.current !== projectId) {
      prevProjectIdRef.current = projectId
      ctx.clearRect(0, 0, width, height)
      branchHistoryRef.current = []
      if (gridRef.current.length > 0) {
        gridRef.current.fill(0)
      }
    }

    // Set line settings for organic rendering
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Generate deterministic parameters for this lyric's vine
    const combined = seed + '|' + (tags || []).join(',') + '|' + intensity.toFixed(3)
    const seedNum = hashStringToUint32(combined || 'seed')
    const mainRng = makeRng(seedNum)

    // Base color for this lyric's plant sprout
    const baseHue = Math.floor(mainRng() * 360)
    const singleColor = `hsl(${baseHue} 80% 50%)`

    // Analyze lyric fields and tags for flower/leaf shape selection
    const textCombined = (
      (translation || '') +
      ' ' +
      (native || '') +
      ' ' +
      (tags || []).join(' ')
    ).toLowerCase()

    let shape:
      | 'dot'
      | 'lotus'
      | 'sunflower'
      | 'hibiscus'
      | 'orchid'
      | 'maple_leaf'
      | 'oval_leaf'
      | 'lanceolate_leaf' = 'dot'

    if (
      /lotus|water|rain|cloud|ocean|tear|river|wet|mist|blue|sea|pond|lake|peace|calm|reflect|pure/i.test(
        textCombined,
      )
    ) {
      shape = 'lotus'
    } else if (
      /sunflower|sun|light|bright|gold|yellow|day|warmth|happy|smile/i.test(textCombined)
    ) {
      shape = 'sunflower'
    } else if (
      /hibiscus|love|heart|flower|blossom|passion|red|tropics|bloom|fire|crimson/i.test(
        textCombined,
      )
    ) {
      shape = 'hibiscus'
    } else if (
      /orchid|rare|exotic|delicate|beauty|gentle|mystery|purple|magenta/i.test(textCombined)
    ) {
      shape = 'orchid'
    } else if (
      /maple|earth|forest|tree|leaf|autumn|fall|change|ground/i.test(textCombined)
    ) {
      shape = 'maple_leaf'
    } else if (
      /oval|green|growth|nature|garden|wood|soil|branch/i.test(textCombined)
    ) {
      shape = 'oval_leaf'
    } else if (
      /lance|wind|flow|breeze|air|float|fly|willow/i.test(textCombined)
    ) {
      shape = 'lanceolate_leaf'
    } else {
      const shapes: (
        | 'dot'
        | 'lotus'
        | 'sunflower'
        | 'hibiscus'
        | 'orchid'
        | 'maple_leaf'
        | 'oval_leaf'
        | 'lanceolate_leaf'
      )[] = [
        'dot',
        'lotus',
        'sunflower',
        'hibiscus',
        'orchid',
        'maple_leaf',
        'oval_leaf',
        'lanceolate_leaf',
      ]
      shape = shapes[seedNum % shapes.length]
    }

    // Grid look-up function to evaluate occupancy in a given direction
    const getOccupancy = (x: number, y: number) => {
      const c = Math.floor(x / cellSize)
      const r = Math.floor(y / cellSize)
      const cols = colsRef.current
      const rows = rowsRef.current
      if (c >= 0 && c < cols && r >= 0 && r < rows) {
        return gridRef.current[r * cols + c] || 0
      }
      return 99999 // Very high value to steer branches away from borders
    }

    // Sprout Source Helper: Always sprout from the last branch that was drawn in the emptiest direction
    const findSproutSource = (rng: () => number) => {
      let startX = 0
      let startY = 0
      let initialAngle = 0

      const L = branchHistoryRef.current.length
      if (L > 0) {
        // Select a point near the end of the history array (last 60 points drawn)
        const startIndex = Math.max(0, L - 60)
        const historyIndex = startIndex + Math.floor(rng() * (L - startIndex))
        const sproutPoint = branchHistoryRef.current[historyIndex]
        startX = sproutPoint.x
        startY = sproutPoint.y

        // Test 8 radial angles to find the emptiest direction
        let bestAngle = rng() * 2 * Math.PI
        let minScore = 999999
        for (let a = 0; a < 8; a++) {
          const testAngle = (a * 2 * Math.PI) / 8
          const testX = startX + Math.cos(testAngle) * 50
          const testY = startY + Math.sin(testAngle) * 50
          const score = getOccupancy(testX, testY)
          if (score < minScore) {
            minScore = score
            bestAngle = testAngle
          }
        }
        initialAngle = bestAngle
      } else {
        // Initial anchor sprout (root at the bottom)
        const sproutXPercent = 0.15 + 0.7 * rng()
        startX = width * sproutXPercent
        startY = height * 0.98

        // Find the emptiest upward direction
        let bestAngle = -Math.PI / 2
        let minScore = 999999
        const upwardAngles = [
          -Math.PI * 0.75,
          -Math.PI * 0.6,
          -Math.PI * 0.5,
          -Math.PI * 0.4,
          -Math.PI * 0.25,
        ]
        for (const testAngle of upwardAngles) {
          const testX = startX + Math.cos(testAngle) * 50
          const testY = startY + Math.sin(testAngle) * 50
          const score = getOccupancy(testX, testY)
          if (score < minScore) {
            minScore = score
            bestAngle = testAngle
          }
        }
        initialAngle = bestAngle
      }

      return { startX, startY, initialAngle }
    }

    const activeTips: Tip[] = []

    // Spawn 3 main vines simultaneously when lyric changes
    const numVines = 3
    for (let v = 0; v < numVines; v++) {
      const vineSeedNum = hashStringToUint32(combined + '|vine-' + v)
      const vineRng = makeRng(vineSeedNum)

      const { startX, startY, initialAngle } = findSproutSource(vineRng)

      const speed = 1.6 + vineRng() * 1.6
      const initialThickness = 5 + intensity * 5
      const maxLife = 130 + Math.floor(intensity * 150)

      activeTips.push({
        x: startX,
        y: startY,
        vx: Math.cos(initialAngle) * speed,
        vy: Math.sin(initialAngle) * speed,
        thickness: initialThickness,
        color: singleColor,
        shape,
        life: maxLife,
        maxLife,
        generation: 0,
        rng: vineRng,
      })
    }

    let idleTimer = 0
    let idleCounter = 0

    function tick() {
      if (activeTips.length > 0) {
        for (let step = 0; step < 2; step++) {
          const nextActive: Tip[] = []

          for (let i = 0; i < activeTips.length; i++) {
            const tip = activeTips[i]

            const nx = tip.x + tip.vx
            const ny = tip.y + tip.vy

            // Solid single color styling for the entire plant
            ctx.strokeStyle = tip.color
            ctx.lineWidth = tip.thickness

            // Draw segment
            ctx.beginPath()
            ctx.moveTo(tip.x, tip.y)
            ctx.lineTo(nx, ny)
            ctx.stroke()

            // Save segment to history
            if (tip.rng() < 0.05) {
              branchHistoryRef.current.push({ x: nx, y: ny })
            }

            // Increment occupancy in grid cell
            const col = Math.floor(nx / cellSize)
            const row = Math.floor(ny / cellSize)
            if (col >= 0 && col < colsRef.current && row >= 0 && row < rowsRef.current) {
              gridRef.current[row * colsRef.current + col] += 1
            }

            tip.x = nx
            tip.y = ny
            tip.life--

            // Look ahead and steer towards empty space (avoiding intersections & borders)
            const currentAngle = Math.atan2(tip.vy, tip.vx)
            const speedMag = Math.sqrt(tip.vx * tip.vx + tip.vy * tip.vy)

            const lookAheadDist = 40
            const scoreCenter = getOccupancy(
              tip.x + Math.cos(currentAngle) * lookAheadDist,
              tip.y + Math.sin(currentAngle) * lookAheadDist,
            )
            const scoreLeft = getOccupancy(
              tip.x + Math.cos(currentAngle - 0.5) * lookAheadDist,
              tip.y + Math.sin(currentAngle - 0.5) * lookAheadDist,
            )
            const scoreRight = getOccupancy(
              tip.x + Math.cos(currentAngle + 0.5) * lookAheadDist,
              tip.y + Math.sin(currentAngle + 0.5) * lookAheadDist,
            )

            let bestAngle = currentAngle
            let minScore = scoreCenter

            if (scoreLeft < minScore) {
              minScore = scoreLeft
              bestAngle = currentAngle - 0.32
            }
            if (scoreRight < minScore) {
              minScore = scoreRight
              bestAngle = currentAngle + 0.32
            }

            // Add organic noise
            const angleNoise = (tip.rng() - 0.5) * 0.16
            const newAngle = bestAngle + angleNoise
            tip.vx = Math.cos(newAngle) * speedMag
            tip.vy = Math.sin(newAngle) * speedMag

            tip.thickness *= 0.987

            // Sprout leaves along the path
            if (tip.life > 10 && tip.rng() < 0.095) {
              const perpAngle = currentAngle + (tip.rng() < 0.5 ? Math.PI / 2 : -Math.PI / 2)
              const sproutDist = tip.thickness * 0.7 + 3
              const sx = tip.x + Math.cos(perpAngle) * sproutDist
              const sy = tip.y + Math.sin(perpAngle) * sproutDist

              const pct = 1 - tip.life / tip.maxLife
              const leafSize = (4.0 + intensity * 4.0) * (0.6 + 0.4 * pct)
              const isFlower = tip.rng() < 0.25
              const shapeToUse = isFlower ? tip.shape : 'oval_leaf'

              // Extract hue value from color HSL string for details inside drawSilhouette
              const match = tip.color.match(/\d+/)
              const baseHueVal = match ? parseInt(match[0], 10) : 0

              drawSilhouette(ctx, sx, sy, shapeToUse, leafSize, tip.color, baseHueVal)
            }

            // Splitting/branching
            if (tip.life > 15 && tip.generation < 3 && tip.rng() < 0.03) {
              const leftAngle = currentAngle - 0.45 - tip.rng() * 0.25
              const rightAngle = currentAngle + 0.45 + tip.rng() * 0.25
              const childThickness = tip.thickness * 0.72

              const leftTip: Tip = {
                ...tip,
                vx: Math.cos(leftAngle) * speedMag,
                vy: Math.sin(leftAngle) * speedMag,
                thickness: childThickness,
                generation: tip.generation + 1,
                life: Math.floor(tip.life * 0.85),
                maxLife: tip.maxLife,
              }

              const rightTip: Tip = {
                ...tip,
                vx: Math.cos(rightAngle) * speedMag,
                vy: Math.sin(rightAngle) * speedMag,
                thickness: childThickness,
                generation: tip.generation + 1,
                life: Math.floor(tip.life * 0.85),
                maxLife: tip.maxLife,
              }

              nextActive.push(leftTip, rightTip)
            } else if (tip.life > 0 && tip.thickness >= 0.8) {
              nextActive.push(tip)
            } else {
              const terminalSize = 10.0 + intensity * 8.0
              const match = tip.color.match(/\d+/)
              const baseHueVal = match ? parseInt(match[0], 10) : 0
              drawSilhouette(ctx, tip.x, tip.y, tip.shape, terminalSize, tip.color, baseHueVal)
            }
          }

          activeTips.length = 0
          activeTips.push(...nextActive)

          if (activeTips.length === 0) {
            break
          }
        }
      } else {
        // Idle growth mode: sprout new vines slowly from existing branches
        idleTimer++
        if (idleTimer >= 75) {
          idleTimer = 0
          idleCounter++

          const idleSeedNum = hashStringToUint32(combined + '|idle-' + idleCounter)
          const idleRng = makeRng(idleSeedNum)
          const idleBaseHue = Math.floor(idleRng() * 360)
          const idleColor = `hsl(${idleBaseHue} 80% 50%)`

          // Select sprout point and emptiest direction using the helper
          const { startX: idleStartX, startY: idleStartY, initialAngle: idleAngle } = findSproutSource(idleRng)

          const idleSpeed = 1.2 + idleRng() * 1.5
          const idleThickness = 3 + intensity * 3.5
          const idleMaxLife = 100 + Math.floor(intensity * 120)

          const idleRootTip: Tip = {
            x: idleStartX,
            y: idleStartY,
            vx: Math.cos(idleAngle) * idleSpeed,
            vy: Math.sin(idleAngle) * idleSpeed,
            thickness: idleThickness,
            color: idleColor,
            shape,
            life: idleMaxLife,
            maxLife: idleMaxLife,
            generation: 1,
            rng: idleRng,
          }

          activeTips.push(idleRootTip)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [projectId, seed, intensity, tags, native, translation, dimensions])

  return <canvas className="fractal-canvas" ref={canvasRef} aria-hidden />
}
