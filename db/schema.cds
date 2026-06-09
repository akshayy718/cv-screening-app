namespace cv.screening;

entity Candidates {
    key ID               : UUID @default: $uuidgenerate;
        FullName         : String(200);
        Email            : String(200);
        Phone            : String(50);
        Skills           : String(1000);
        YearsOfExperience: Integer;
        CurrentRole      : String(200);
        CVFileName       : String(500);
        CVText           : LargeString;
        AISummary        : LargeString;
        CreatedAt        : DateTime @cds.on.insert: $now;
}