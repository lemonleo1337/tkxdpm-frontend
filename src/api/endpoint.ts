
export const endpoint = {
    auth: {
        login: "/auth/login-matching",
        getMe: "/auth/profile"
    },
    services: {
        getList: "/services",
        getTop: "/services/top",
        getDetail: (id: string | number) => `/services/${id}`,
        session: (id: string) => `/services/${id}/sessions`,
        workout: (id: string, session_id: string) => `/services/${id}/sessions/${session_id}/workouts`,

    },
    trainer: {
        getList: "/trainers",
        getDetail: (id: string | number) => `/trainers/${id}`,
    },
    booking: {
        create: "/bookings",
        getList: "/bookings",
        getDetail: (id: string | number) => `/bookings/${id}`,
    },
    serviceClasses: {
        memberList: "/service_classes/member",
        trainerList: "/service_classes/trainer",
        getDetail: (id: string | number) => `/service_classes/${id}`,
    },
    workout: {
        getList: "/workouts",
        getDetail: (id: string | number) => `/workouts/${id}`,
    },
    member: {
        getDetail: (id: string | number) => `/members/${id}`,
        getBody : (id: string | number) => `/members/${id}/measurements`,
    },
}