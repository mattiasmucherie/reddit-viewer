import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
export const NavigationButton = styled.button`
  padding: 4px 16px;
  background: #0079d3;
  border-radius: 9999px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  margin: 4px;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    cursor: not-allowed;
    background: #ccc;
    color: #777;
  }
`
const ViewMore = styled.span`
  font-size: 12px;
`

interface PageButtonsProps {
  onClickPrev: () => void
  onClickNext: () => void
  pageCount: number
  isLoading: boolean
}
const PageButtons: React.VFC<PageButtonsProps> = ({ onClickPrev, onClickNext, pageCount, isLoading }) => {
  return (
    <ButtonContainer>
      {pageCount > 0 ? (
        <NavigationButton disabled={isLoading} onClick={onClickPrev}>
          Prev
        </NavigationButton>
      ) : (
        <ViewMore>view more:</ViewMore>
      )}
      <NavigationButton disabled={isLoading} onClick={onClickNext}>
        Next
      </NavigationButton>
    </ButtonContainer>
  )
}

export default PageButtons
