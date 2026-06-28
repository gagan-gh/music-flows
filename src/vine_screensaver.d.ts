import { FC } from 'react'

interface VineScreensaverProps {
  backgroundMode?: boolean
  flowerType?: string
  colorProfile?: number
}

export function seedFlowerSelection(str: string): { flowerType: string; colorProfile: number }

declare const VineScreensaver: FC<VineScreensaverProps>
export default VineScreensaver
