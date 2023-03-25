using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>{
                    new AppUser { DisplayName="Priya", UserName="priya", Email="priya@gmail.com"},
                    new AppUser { DisplayName="Dhiren", UserName="dhiren", Email="dhiren@gmail.com"},
                    new AppUser { DisplayName="Baby", UserName="baby", Email="baby@gmail.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa&&w0rd");
                }

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Event 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Event 2 months ago",
                        Category = "drinks",
                        City = "India",
                        Venue = "Pub",
                        IsCancelled = false,
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Past Event 2",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "Event 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "Eifel Tower",
                        IsCancelled = false,
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                }
                            }
                    },
                    new Activity
                    {
                        Title = "Future Event 1",
                        Date = DateTime.UtcNow.AddMonths(1),
                        Description = "Event 1 month in future",
                        Category = "culture",
                        City = "India",
                        Venue = "Natural History Museum",
                        IsCancelled = false,
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Future Event 2",
                        Date = DateTime.UtcNow.AddMonths(2),
                        Description = "Activity 2 event in future",
                        Category = "music",
                        City = "India",
                        Venue = "O2 Arena",
                        IsCancelled = false,
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Future event 3",
                        Date = DateTime.UtcNow.AddMonths(3),
                        Description = "Event 3 months in future",
                        Category = "drinks",
                        City = "India",
                        Venue = "Another pub",
                        IsCancelled = false,
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Future event 4",
                        Date = DateTime.UtcNow.AddMonths(4),
                        Description = "event 4 months in future",
                        Category = "drinks",
                        City = "India",
                        Venue = "Yet another pub",
                        IsCancelled = false,
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = true
                                }
                            }
                    },
                    new Activity
                    {
                        Title = "Future event 5",
                        Date = DateTime.UtcNow.AddMonths(5),
                        Description = "Event 5 months in future",
                        Category = "drinks",
                        City = "India",
                        Venue = "Just another pub",
                        IsCancelled = false,
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.UtcNow.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "music",
                        City = "India",
                        Venue = "Roundhouse Play",
                        IsCancelled = false,
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.UtcNow.AddMonths(7),
                        Description = "Activity 2 months ago",
                        Category = "travel",
                        City = "India",
                        Venue = "Somewhere on the Ganges",
                        IsCancelled = false,
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.UtcNow.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "film",
                        City = "India",
                        Venue = "Cinema",
                        IsCancelled = false,
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}