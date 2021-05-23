import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const NavigationButton = styled.button`
  padding: 1px 4px;
  background: #eee;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: #f0f0f0;
    border: 1px solid #82a6c9;
  }
  &:disabled {
    cursor: not-allowed;
    &:hover {
      background: #eee;
      border: 1px solid #ddd;
    }
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
