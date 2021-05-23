import React from 'react'

interface PageButtonsProps {
  onClickPrev: () => void
  onClickNext: () => void
  pageCount: number
  isLoading: boolean
}
const PageButtons: React.VFC<PageButtonsProps> = ({ onClickPrev, onClickNext, pageCount, isLoading }) => {
  return (
    <>
      <button disabled={pageCount <= 0 || isLoading} onClick={onClickPrev}>
        Prev
      </button>
      <button disabled={isLoading} onClick={onClickNext}>
        Next
      </button>
    </>
  )
}

export default PageButtons
