namespace JobSearchProject.Models
{
    public partial class DriverVacancy : Vacancy
    {
        public decimal DrivingExperience { get; set; }               

        public int SpecializationId { get; set; }       

        public virtual Specialization Specialization { get; set; }
    }
}
