namespace JobSearchProject.Models
{
    public enum PaymentType
    {
        PerHour,
        PerDay,
        PerMonth
    }

    public enum EmploymentType
    {
        Full,
        Partial
    }

    public enum Status
    {
        Saved,
        Published,
        Closed,
        Favourite
    }

    public enum SpecializationType
    {
        Driver,
        Housekeeper,
        Nurse,
        Babysitter
    }

    public enum EducationType
    {
        Secondary,
        Higher,
        NotSpecified
    }

    public enum EducationSpecialityType
    {
        Pedagogical,
        Medical
    }

    public enum LanguageType
    {
        English,
        Spanish,
        Ukraine,
        Russian,
        French,
        Chinese,
        Portuguese
    }

    public enum Responsibilities
    {
        Cooking,
        Cleaning,
        DogWalking
    }

}
