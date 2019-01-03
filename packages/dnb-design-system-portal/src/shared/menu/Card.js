/**
 * Card
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const boxStyle = css`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;

  min-width: 33.333333%;
  padding: 0;
  margin: 0;

  border: none;

  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-weight: 100;

  &:focus,
  &:hover {
    filter: grayscale(90%);
    transition: filter 0.5s ease;
    border: none;
  }
  [data-whatinput='keyboard'] &:focus {
    box-shadow: none;
  }

  @media (max-width: 640px) {
    & {
      min-width: 100%;
      transition: 0.5s;
      height: 240px;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: scale3d(0.9, 0.9, 1) translate3d(0, -8%, 0);
    }
    40% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    }
  }

  opacity: 0;
  animation: fade-in 600ms cubic-bezier(0.19, 1, 0.22, 1) 1 var(--delay)
    forwards;
`

const Header = styled.span`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 6em;

  text-align: center;

  color: white;
  background-color: rgba(0, 0, 0, 0.15);

  @media (max-width: 640px) {
    & {
      height: 4em;
      transition: 0.5s;
    }
  }
`

const Box = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
`

export default class Card extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    customStyle: PropTypes.object,
    title: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func
  }
  static defaultProps = {
    customStyle: null,
    onClick: null
  }
  render() {
    const { url, customStyle, title, icon: Svg, onClick } = this.props
    return (
      <Link
        css={[
          // 'remove-anker-style',
          boxStyle,
          customStyle
        ]}
        className="no-underline no-underline-hover"
        style={{ '--delay': `${random(1, 160)}ms` }}
        to={url}
        onClick={onClick}
      >
        <Box className="section-box">
          <Svg />
        </Box>
        <Header>{title}</Header>
      </Link>
    )
  }
}

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)
