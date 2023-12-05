

import { fetchScreeningLog } from '$lib/redcap-server-utils'

export const load = async () => {

  const screeningLog = await fetchScreeningLog();
  
  return {
    screeningLog
  }
}