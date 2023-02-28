
export function Reload() {
  const { link } = Astro.params

  return(
    <>
    <h1>{link}</h1>
    </>
  )
}