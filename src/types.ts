/**
 * Typescript topics to use
 *
 * type => DONE
 * interface => DONE
 * number => DONE
 * string => DONE
 * boolean
 * Object => DONE
 * Array => DONE
 * Tuple
 * Enum
 * Any
 * Void
 * Never
 * Union
 * Function
 * Optional parameters
 * Default parameters
 * Function overloading
 * Extending interfaces
 * Intersection types
 * Type guards
 * Type Assertions
 * TS Generics
 * Generic constraints
 * Generic interfaces
 */

export type TTimeStamp = number

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
  timeStamp: TTimeStamp
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
  timeStamp: TTimeStamp
}

export type Tag = {
  id: string
  label: string
}

export type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export type NoteProps = {
  onDelete: (id: string) => void
}

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

export type NoteLayoutProps = {
  notes: Note[]
}

export type SimplifiedNote = {
  tags: Tag[]
  title: string
  id: string
  markdown: string
}

export type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

export type EditTagsModalProps = {
  show: boolean
  availableTags: Tag[]
  handleClose: () => void
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

export interface IContextValue {
  updateTag: (id: string, label: string) => void
  addTag: (tag: Tag) => void
  deleteTag: (id: string) => void
  onDeleteNote: (id: string) => void
  onUpdateNote: (id: string, data: NoteData) => void
  onCreateNote: (data: NoteData) => void
  notesWithTags: { id: string; title: string; markdown: string; tags: Tag[] }[]

  setNotes: Function
  setTags: Function
  notes: RawNote[]
  tags: Tag[]
}
