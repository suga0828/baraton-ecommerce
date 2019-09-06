export interface Category {
  id: string,
  name: string,
	sublevels?: Category[]
}