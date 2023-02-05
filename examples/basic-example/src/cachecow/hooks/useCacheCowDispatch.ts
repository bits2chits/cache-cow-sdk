import { useContext } from "react"
import { CacheCowDispatchContext } from "../context/CacheCow"

export default function useCacheCowDispatch() {
  const dispatch = useContext(CacheCowDispatchContext)
  return dispatch
}