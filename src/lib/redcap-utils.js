
export const checkmarkEmoji = '✅';
export const crossEmoji = '❌';

export const exclusionReasonsMap = {
  '11': 'Patient/parent or guardian/responsible person unable or unlikely to adhere to schedule of treatment and monitoring',
  '12': 'Patient/parent or guardian/responsible person did not provide informed consent',
  '1': 'Source control sub-optimal',
  '2': 'Polymicrobial infection (>2 key pathogens)',
  '3': 'Pathogen driving infectious syndrome not appropriately confirmed',
  '4': 'No suitable phages identified',
  '5': 'Regulatory approvals not completed',
  '6': 'Treating clinician opted out / Changed their mind',
  '7': 'Patient deceased prior to treatment',
  '81': 'Treating clinician opted out: patient improved/phage therapy not required',
  '82': 'Treating clinician opted out: safety or other concerns',
  '83': 'Manufacturer declined to provide phage product',
  '0': 'Other reason for exclusion' // Special case, use scr_exclusion_text for the actual text
};

export const pathogenTargetsMap = {
  '1': 'E. coli',
  '4': 'P. aeruginosa',
  '8': 'Klebsiella species',
  '12': 'Shigella species',
  '16': 'Enterobacter species',
  '20': 'Citrobacter species',
  '24': 'Salmonella species',
  '28': 'Serratia marcescens',
  '32': 'Acinetobacter species',
  '51': 'S. aureus',
  '59': 'Other staphylococci',
  '61': 'Enterococcus faecalis',
  '62': 'Enterococcus faecium',
  '71': 'M. abscessus',
  '79': 'Other mycobacteria',
  '97': 'Unconfirmed',
  '98': 'Polymicrobial',
  '99': 'Other' // Special case, use scr_target_other_txt for the actual text
};


export function getExclusionReasons(entry) {
  let reasons = [];
  for (const key in entry) {
    if (key.startsWith('scr_exclusion_reasons___') && entry[key]) {
      const reasonCode = key.split('___')[1];
      const reasonText = reasonCode === '0' ? entry.scr_exclusion_text : exclusionReasonsMap[reasonCode];
      if (reasonText) {
        reasons.push(reasonText);
      }
    }
  }
  return reasons;
}

export function getPathogenTargets(entry) {
  let targets = [];
  for (const key in entry) {
    if (key.startsWith('scr_target___') && entry[key]) {
      const targetCode = key.split('___')[1];
      const targetText = targetCode === '99' ? entry.scr_target_other_txt : pathogenTargetsMap[targetCode];
      if (targetText) {
        targets.push(targetText);
      }
    }
  }
  return targets;
}
