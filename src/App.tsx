import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import { EditNote } from './EditNote'
import { NewNote } from './NewNote'
import { Note } from './Note'
import { NoteLayout } from './NoteLayout'
import { NoteList } from './NoteList'
import { UseNoteContext } from './store'

function App() {
  const {
    updateTag,
    addTag,
    onDeleteNote,
    onUpdateNote,
    onCreateNote,
    notesWithTags,
    notes,
    setNotes,
    tags,
    setTags,
    deleteTag,
  } = UseNoteContext()
  return (
    <Container className='my-4'>
      <Routes>
        <Route
          path='/'
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path='/new'
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path='edit'
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
