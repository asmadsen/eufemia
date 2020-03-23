/**
 * To showcase the Pagination in combination with a Table
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Section, Space, Button } from '../../src/components'
import { Table, H1, P, Ul } from '../../src/elements'
import { StickyHelper } from '../../src/elements/Table'

import { createPagination } from '../../src/components/Pagination'

export default [
  'PaginationTable',
  () => (
    <Wrapper className="dnb-core-style" spacing>
      <Space left>
        <H1 size="small">Infinity Table</H1>
        <P bottom>
          This is a semantic correct table using infinity scrolling. It
          also has a sticky header.
        </P>
        <Ul bottom>
          <li>The startup page number is set to 3.</li>
          <li>And per page we show 10 items.</li>
          <li>
            A random delay is added to simulate asynchronous interaction.
          </li>
        </Ul>
      </Space>
      <InfinityPaginationTable tableItems={tableItems} />
    </Wrapper>
  )
]

// create our items
const tableItems = []
for (let i = 1; i <= 300; i++) {
  tableItems.push({ ssn: i, text: String(i), expanded: false })
}

export const InfinityPaginationTable = ({ tableItems, ...props }) => {
  const startupPage = 3 // what we start with
  const perPageCount = 10 // how many items per page

  // create our Pagination instance
  const [
    { Pagination, setContent, resetContent, endInfinity }
  ] = React.useState(createPagination)
  const [orderDirection, setOrderDirection] = React.useState('asc')
  const [currentPage, setLocalPage] = React.useState(null)
  const [cacheHash, forceRerender] = React.useState(null) // eslint-disable-line

  // is not needed
  // const maxPagesCount = Math.floor(tableItems?.length / perPageCount)

  // ascending / descending
  tableItems = reorderDirection(tableItems, orderDirection)

  const onToggleExpanded = ({ ssn: _ssn }, pageNo, element = null) => {
    const index = tableItems.findIndex(({ ssn }) => ssn === _ssn)
    if (index > -1) {
      const item = tableItems[index]

      // update only the current item
      tableItems[index] = {
        ...item,
        expanded: !item.expanded
      }

      // define what page should update
      // used to update the page inside the Paginatio Component
      setLocalPage(pageNo)

      // force rerender of this component
      forceRerender(new Date().getTime())

      // set new height
      setHeight({ element, expanded: !item.expanded })
    }
  }
  // set the startup height
  const onMounted = items => {
    items.forEach(({ element: { current: element }, expanded }) =>
      setHeight({ element, expanded, animation: false })
    )
  }

  // This limits the items to perPageCount
  const content = (
    <InfinityPagination
      items={tableItems}
      perPageCount={perPageCount}
      currentPage={currentPage}
      onToggleExpanded={onToggleExpanded}
      onMounted={onMounted}
      endInfinity={endInfinity}
    />
  )

  setContent(currentPage, content)

  return (
    <StyledTable sticky>
      <thead>
        <tr>
          <th scope="col">
            <Button
              size="small"
              icon="reset"
              icon_position="left"
              variant="secondary"
              on_click={() => {
                resetContent()

                // rerender our component to get back the default state
                setOrderDirection('asc')

                // rerender our component to get back the default state
                forceRerender(new Date().getTime())
              }}
            >
              Reset everything
            </Button>
          </th>
          <th
            scope="col"
            className={`dnb-table--sortable dnb-table--active ${
              orderDirection === 'desc' ? ' dnb-table--reversed' : ''
            }`}
          >
            <Button
              variant="tertiary"
              icon="arrow-down"
              text="Sortable"
              title="Sort table row"
              on_click={() => {
                // 1. empty
                resetContent()

                setOrderDirection(o => (o === 'asc' ? 'desc' : 'asc'))
              }}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <StickyHelper />
        <Pagination
          mode="infinity"
          // use_load_button // disables infinity scroller, but will add a button to do so
          marker_element="tr"
          fallback_element={({ className, ...props }) => (
            <TableRow className={className}>
              <TableData colSpan="2" {...props} />
            </TableRow>
          )} // in order to show the injected "indicator" and "load button" in the middle of the orw
          startup_count={1} // how many pages to show on starutp
          parallel_load_count={1} // how many pages to load during next load
          startup_page={startupPage} // the very first page we load
          // current_page={currentPage}// is not needed
          // page_count={maxPagesCount}// is not needed
          {...props}
          on_startup={({ page }) => {
            // console.log('on_startup: with page', page)

            // simulate server delay
            setTimeout(() => {
              // once we set current page, we force a rerender, and sync of data
              setLocalPage(page)

              // since currentPage already is the same
              forceRerender(new Date().getTime())
            }, Math.ceil(Math.random() * 1e3)) // simulate random delay
          }}
          on_load={({ page /*, setContent, resetContent */ }) => {
            console.log('on_load: with page', page)
          }}
          on_change={({ page }) => {
            console.log('on_change: with page', page)

            // simulate server delay
            setTimeout(() => {
              // once we set current page, we force a rerender, and sync of data
              setLocalPage(page)
            }, Math.ceil(Math.random() * 1e3 + 2e3)) // simulate random delay
          }}
        />
      </tbody>
    </StyledTable>
  )
}
InfinityPaginationTable.propTypes = {
  tableItems: PropTypes.array.isRequired
}

const InfinityPagination = ({
  children,
  items,
  currentPage,
  perPageCount,
  onToggleExpanded,
  onMounted,
  endInfinity,
  ...props
}) => {
  const mountedItems = []
  React.useEffect(() => onMounted && onMounted(mountedItems), []) // eslint-disable-line

  items = items.filter((cur, idx) => {
    const floor = (currentPage - 1) * perPageCount
    const ceil = floor + perPageCount
    return idx >= floor && idx < ceil
  })

  if (items.length === 0) {
    endInfinity()
    return null
  }

  return items.map(item => {
    const params = {
      onClick: e => {
        onToggleExpanded(item, currentPage, e.currentTarget)
      }
    }
    const ref = React.createRef(null)
    mountedItems.push({ ...item, element: ref })

    return (
      <TableRow
        key={item.ssn}
        {...props}
        ref={ref}
        className={item.expanded ? 'expanded' : ''}
      >
        <TableData {...params}>
          <Button
            title={item.expanded ? 'Hide details' : 'Show more details'}
            icon="chevron_down"
            size="small"
            right="large"
          />
          {item.expanded && <strong>I'm expanded!</strong>}
        </TableData>
        <TableData {...params}>
          <P className="dnb-h2">
            {item.text} {children}
          </P>
        </TableData>
      </TableRow>
    )
  })
}

const StyledTable = styled(Table)`
  table-layout: fixed;
`

const TableRow = styled.tr`
  &:hover {
    opacity: 0.8;
  }
  .dnb-icon {
    transition: transform 300ms ease-out;
  }

  &.expanded {
    .dnb-icon {
      ${'' /* transform: scale(-1); */}
      transform: rotate(-180deg);
    }
  }

  /** This is our expanded height (maxHeight) */
  /** NB: we can use max-height, because max-height is not supported in tr */
  max-height: 10rem;
  transition: height 0.4s ease-out;
`

const TableData = styled.td`
  cursor: pointer;

  .dnb-pagination__indicator,
  .dnb-pagination__loadbar {
    height: 6rem;
    justify-content: flex-start;
  }

  .dnb-p {
    font-feature-settings: 'pnum' on, 'lnum' on;
    font-weight: var(--font-weight-bold);
  }
`

const setHeight = ({
  element,
  expanded = false,
  animation = true
} = {}) => {
  if (
    element &&
    typeof window !== 'undefined' &&
    window.requestAnimationFrame
  ) {
    // get tr element
    if (String(element.nodeName).toLowerCase() === 'td') {
      element = element.parentElement
    }

    // get the new height
    const newHeight = expanded
      ? window.getComputedStyle(element)['max-height'] // maxHeight
      : element.scrollHeight

    // make the animation
    window.requestAnimationFrame(() => {
      if (animation) {
        element.style.height = '1px'
      }
      window.requestAnimationFrame(
        () => (element.style.height = newHeight)
      )
    })
  }
}

const reorderDirection = (items, dir) =>
  items.sort(({ text: A }, { text: B }) => {
    const a = parseFloat(A)
    const b = parseFloat(B)
    return (dir === 'asc' ? a > b : a < b) ? 1 : -1
  })

// Page layout
const Wrapper = styled(Section)`
  width: 100%;
  background: white;
`
