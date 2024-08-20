import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterSection = styled.div`
  a {
    color: inherit;
    text-underline-position: under;
    text-decoration-color: var(--bodyDimmed);
  }

  h1 {
    font-size: inherit;
    line-height: inherit;
    font-weight: normal;
    display: inline-block;
  }
`

const Footer = () => (
  <FooterSection>
    <a href='https://github.sayidhe.com/color-scale/'><h1>Scale</h1></a>&nbsp; · &nbsp;made by <a href='http://hihayk.com' target='_blank' rel='noopener noreferrer'>Hayk</a>&nbsp; · &nbsp;update by <a href='http://sayidhe.com' target='_blank' rel='noopener noreferrer'>Sayid</a>&nbsp; · &nbsp;<a href='https://github.com/sayidhe/color-scale' target='_blank' rel='noopener noreferrer'>GitHub</a>
    &nbsp; · &nbsp;<Link to="/gallery">Gallery</Link>
  </FooterSection>
)

export default Footer