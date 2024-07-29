import 'bootstrap/dist/css/bootstrap.min.css'
import { createContext, useContext, useMemo } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useLocalStorage } from './customHook/useLocalStorage'
import { IContextValue, NoteData, RawNote, Tag } from './types'

const NoteContext = createContext<IContextValue | undefined>(undefined)

export const NoteContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id)
    })
  }

  const value: IContextValue = useMemo(() => {
    return {
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
    }
  }, [
    updateTag,
    deleteTag,
    addTag,
    onDeleteNote,
    onUpdateNote,
    onCreateNote,
    notesWithTags,
    notes,
    setNotes,
    tags,
    setTags,
  ])
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
}

export const UseNoteContext = () => useContext(NoteContext)
