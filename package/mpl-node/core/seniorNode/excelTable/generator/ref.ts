
export default (el: any): Partial<any> => {
  const v: Partial<any> = JSON.parse(JSON.stringify(el))

  return v
}
