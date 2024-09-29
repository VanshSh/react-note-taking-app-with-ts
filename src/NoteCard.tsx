import { Badge, Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CancelSvg } from './assets/icons.js'
import styles from './NoteList.module.css'
import { UseNoteContext } from './store.js'
import { IContextValue, SimplifiedNote } from './types'

function NoteCard({ id, title, tags, markdown }: SimplifiedNote) {
  const { onDeleteNote } = UseNoteContext() as IContextValue // Type Assertion

  const truncatedDesc =
    markdown?.length > 30 ? markdown.substring(0, 30) + '..' : markdown

  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 p-3 text-reset text-decoration-none ${styles.card}`}
    >
      <span
        onClick={() => {
          onDeleteNote(id)
        }}
        className={`position-absolute bg-light rounded-circle ${styles.card_cancel_button} `}
      >
        {CancelSvg}
      </span>
      <Card.Title>
        <span className='fs-5'>{title}</span>
      </Card.Title>
      <Card.Body className='p-0 pb-2'>
        <span className='fs-6'>{truncatedDesc}</span>
        <Stack
          gap={2}
          className='align-items-center justify-content-center h-100'
        >
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction='horizontal'
              className='justify-content-center flex-wrap'
            >
              {tags.map((tag) => (
                <Badge
                  className='text-truncate'
                  pill
                  bg='primary'
                  style={{ height: '22px' }}
                  key={tag.id}
                >
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default NoteCard
