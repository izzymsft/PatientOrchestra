--- https://docs.microsoft.com/en-us/stream-analytics-query/query-language-elements-azure-stream-analytics
--- https://docs.microsoft.com/en-us/stream-analytics-query/join-azure-stream-analytics
--- We need records from these 3 input sources that were generated within a minute of each other
/**
SELECT
    TRY_CAST(T1.VitalTimestamp AS datetime) AS CaptureTime, --- When this record was captured (yyyy-MM-dd HH:mm:ss.fff)
    TRIM(T1.PatientId) AS id, --- unique patient identifier
    T1.Total as total, --- how many vitals we need to generate from the python function
	TRY_CAST(T2.MinTemperature AS bigint) AS min_temperature, --- the lowest temperature to be in the vitals
    TRY_CAST(T2.MaxTemperature AS bigint) AS max_temperature, --- the highest temperature to be in the vitals
    T3.MinPulse AS min_pulse, --- the lowest pulse to be in the vitals
    T3.MaxPulse AS max_pulse, --- the highest pulse to be in the vitals
    T3.MinDiastolic AS min_diastolic, --- the lowest diastolic blood pressure
    T3.MaxDiastolic AS max_diastolic, --- the highest diastolic blood pressure
    T3.MinSystolic AS min_systolic, --- the lowest systolic blood pressure
    T3.MaxSystolic AS max_systolic --- the highest systolic blood pressure

INTO JobInfo --- the stream output destination (another eventhub topic)

FROM PatientTotals T1 TIMESTAMP BY VitalTimestamp --- this is the input source that contains how many record we should generate
JOIN PatientTemperature T2 TIMESTAMP BY VitalTimestamp --- this input source contains the temperature ranges
ON T1.PatientId = T2.PatientId AND (DATEDIFF(second,T1, T2) between 0 AND 59)
JOIN PatientPulseAndPressure T3 TIMESTAMP BY VitalTimestamp --- this input source contains the pulse and BP ranges
ON T2.PatientId = T3.PatientId AND (DATEDIFF(second, T2, T3) between 0 AND 59)

**/