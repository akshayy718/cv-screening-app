using CandidateService as service from '../srv/service';

annotate service.Candidates with @(

    UI.LineItem: [
        { Value: FullName,          Label: 'Full Name' },
        { Value: Email,             Label: 'Email' },
        { Value: CurrentRole,       Label: 'Current Role' },
        { Value: YearsOfExperience, Label: 'Experience (Years)' },
        { Value: Skills,            Label: 'Skills' }
    ],

    UI.HeaderInfo: {
        TypeName: 'Candidate',
        TypeNamePlural: 'Candidates',
        Title: { Value: FullName },
        Description: { Value: CurrentRole }
    },

    UI.FieldGroup#MainDetails: {
        Label: 'Candidate Details',
        Data: [
            { Value: FullName,          Label: 'Full Name' },
            { Value: Email,             Label: 'Email' },
            { Value: Phone,             Label: 'Phone' },
            { Value: CurrentRole,       Label: 'Current Role' },
            { Value: YearsOfExperience, Label: 'Years of Experience' },
            { Value: Skills,            Label: 'Skills' },
            { Value: CVFileName,        Label: 'Uploaded CV File' }
        ]
    },

    UI.FieldGroup#AIResults: {
        Label: 'AI Generated Summary',
        Data: [
            { Value: AISummary, Label: 'AI Summary' }
        ]
    },

    UI.FieldGroup#CVPreview: {
        Label: 'Extracted CV Text',
        Data: [
            { Value: CVText, Label: 'CV Content' }
        ]
    },

    UI.FieldGroup#UploadSection: {
        Label: 'CV Upload',
        Data: [
            { Value: CVFileName, Label: 'Current CV File' }
        ]
    },

    UI.Identification: [
        {
            $Type  : 'UI.DataFieldForAction',
            Label  : 'Upload CV',
            Action : 'CandidateService.uploadCV'
        }
    ],

    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            Label: 'Candidate Details',
            Target: '@UI.FieldGroup#MainDetails'
        },
        {
            $Type: 'UI.ReferenceFacet',
            Label: 'CV Upload',
            Target: '@UI.FieldGroup#UploadSection'
        },
        {
            $Type: 'UI.ReferenceFacet',
            Label: 'AI Summary',
            Target: '@UI.FieldGroup#AIResults'
        },
        {
            $Type: 'UI.ReferenceFacet',
            Label: 'Extracted CV Text',
            Target: '@UI.FieldGroup#CVPreview'
        }
    ]
);