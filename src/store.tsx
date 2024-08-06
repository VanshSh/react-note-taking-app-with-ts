import 'bootstrap/dist/css/bootstrap.min.css'
import { createContext, useCallback, useContext, useMemo } from 'react'
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
        {
          ...data,
          id: uuidV4(),
          tagIds: tags.map((tag) => tag.id),
          timeStamp: Date.now(),
        },
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.id),
            timeStamp: Date.now(),
          }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = useCallback(
    (id: string) => {
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note.id !== id)
      })
    },
    [setNotes, notes]
  )

  const addTag = useCallback(
    (tag: Tag) => {
      setTags((prev) => [...prev, tag])
    },
    [setTags, tags]
  )

  const updateTag = useCallback(
    (id: string, label: string) => {
      setTags((prevTags) => {
        return prevTags.map((tag) => {
          if (tag.id === id) {
            return { ...tag, label }
          } else {
            return tag
          }
        })
      })
    },
    [setTags, tags]
  )

  const deleteTag = useCallback(
    (id: string) => {
      setTags((prevTags) => {
        return prevTags.filter((tag) => tag.id !== id)
      })
    },
    [setTags, tags]
  )
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
