
IF OBJECT_ID('dbo.PatientScores', 'U') IS NOT NULL 
  DROP TABLE dbo.PatientScores; 

CREATE TABLE dbo.PatientScores --- Table for Storing Patient Scores
(
    TransactionId int IDENTITY (1,1) NOT NULL,  --- Primary Key for the Score
    PatientId VARCHAR(40) NOT NULL,             --- Identifies the Patient
    MinTemp DECIMAL(5,2) NOT NULL,              --- The Minimum Body Temperature
    MaxTemp DECIMAL(5,2) NOT NULL,              --- The Maximum Body Temperature
    AveTemp DECIMAL(5,2) NOT NULL,              --- The Mean Body Temperature
    ScoreTemp DECIMAL(5,2) NOT NULL,            --- The score by the analyzer
    MinPulse DECIMAL(5,2) NOT NULL,             --- The Minimum Pulse
    MaxPulse DECIMAL(5,2) NOT NULL,             --- The Maximum Pulse
    AvePulse DECIMAL(5,2) NOT NULL,             --- The Mean Pulse
    ScorePulse DECIMAL(5,2) NOT NULL,           --- The score by the analyzer
    AveDiastolic DECIMAL(5,2) NOT NULL,         --- The average diastolic pressure
    AveSystolic DECIMAL(5,2) NOT NULL,          --- The average systolic pressure
    ScoreBloodPressure DECIMAL(5,2) NOT NULL,   --- The score for the BP
    ScoreTimestamp datetime2 NOT NULL           --- The timestamp for the scoring event
);

CREATE TABLE dbo.PatientScores --- Table for Storing Patient Scores
(
    TransactionId int IDENTITY (1,1) NOT NULL,  --- Primary Key for the Score
    PatientId VARCHAR(40) NOT NULL,             --- Identifies the Patient
    Score DECIMAL(5,2) NOT NULL,   --- The score for the BP
    ScoreTimestamp datetime2 NOT NULL           --- The timestamp for the scoring event
);

