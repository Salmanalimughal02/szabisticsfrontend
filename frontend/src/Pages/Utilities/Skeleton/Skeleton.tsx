import React from 'react'
import './Skeleton.css'

interface SkeletonProps {
  height?: string;
  width?: string;
  marginBottom?: string;
  marginRight?: string;
  marginTop?: string;
  marginLeft?: string;
  borderRadius?: string
}

const Skeleton: React.FC<SkeletonProps> = ({
  height,
  width,
  marginBottom,
  marginRight,
  marginTop,
  marginLeft,
  borderRadius
}) => {
  return (
    <div style={{
      height: height, width: width, marginBottom: marginBottom, marginLeft: marginLeft, marginRight: marginRight, marginTop: marginTop, borderRadius
    }} className='skeleton-component'>

    </div>
  )
}

export default Skeleton
