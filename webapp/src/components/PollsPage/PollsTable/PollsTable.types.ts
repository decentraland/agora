import { PollWithAssociations } from 'modules/poll/types'

export type Props = {
  title: React.ReactNode
  polls: PollWithAssociations[]
  currentPage: number
  rowsPerPage: number
  totalRows: number
  onPageChange: (page: number) => void
}
