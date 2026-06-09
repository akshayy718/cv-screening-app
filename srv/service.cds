using { cv.screening } from '../db/schema';

@path: '/candidate'
service CandidateService {

    entity Candidates as projection on screening.Candidates;

    action uploadCV(candidateId : UUID, fileName : String, fileContent : String) returns String;

    action processCV(candidateId : UUID) returns String;

}