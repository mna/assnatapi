/*jshint asi:true, trailing:true*/

/*
** Intervention object:
** - subject : the subject of the intervention
** - subtitle : the subtitle of the intervention
** - speaker : the speaker as written in the log
** - time : the approximate time of the intervention (date object)
** - text : the text of the intervention
** - deputyId : the ID of the deputy object corresponding to the speaker [optional]
** - metaRefId : the refId of the meta object of the business day
** - district : the district of the deputy at the moment of the intervention
** - party : the party name of the deputy at the moment of the intervention
** - daySeqId : unique identifier for the business day of the intervention
** - prevSeqId : the day sequence ID of the previous intervention
** - nextSeqId : the day sequence ID of the next intervention
*/
function augmentIntervention(intr) {
  // Add the path to the deputy
  if (intr.deputyId) {
    intr.deputyPath = '/deputes/' + intr.deputyId
  }
  // Add the path to the meta
  // TODO : No direct link right now...
  /*intr.metaPath = '/travaux/' + 
  // Add the paths to the next and previous interventions
  if (intr.prevSeqId) {
    intr.prevInterventionPath = '/'
  }
  -*/
}
