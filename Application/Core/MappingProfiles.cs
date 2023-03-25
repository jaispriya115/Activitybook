using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>();

            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(d => d.Username, m => m.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, m => m.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Bio, m => m.MapFrom(s => s.AppUser.Bio));

            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, m => m.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
        }
    }
}