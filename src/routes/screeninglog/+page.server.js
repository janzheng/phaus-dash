

import { fetchScreeningLog } from '$lib/redcap-server-utils'
import { getExclusionReasons, getPathogenTargets } from '$lib/redcap-utils'



function processScreeningLog(screeninglog) {
  let log = screeninglog.map(entry => {
    /* 
      Builds a special "_meta" key with processed values for frontend
      - easier to build
      - search should "prefer" filtering these
    */
    entry['_meta'] = {
      'id': entry['scr_id'],
      'date': entry['scr_date'],
      'full_date': new Date(entry['scr_date']).toLocaleString('en-AU', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
      'initials': entry['scr_patient_initials'],
      'inclusion': entry.scr_meets_inclusion === 'Yes',
      'isComplete': entry.screening_log_complete === 'Complete',
      'exclusions': getExclusionReasons(entry),
      'targets': getPathogenTargets(entry),
    }


    // filter out empty string keys
    for (let key in entry) {
      if (entry[key] === "") {
        delete entry[key];
      }
    }

    return entry
  })


  return log
}

export const load = async () => {

  const screeningLog = await fetchScreeningLog();
  
  return {
    screeningLog: processScreeningLog(screeningLog)
  }
}