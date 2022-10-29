import moment from 'moment';

const generateTimeRangeConfig = (language, t) => ({
    timePicker: true,
    startDate: moment().toDate(),
    endDate: moment().add(7, "days").toDate(),
    autoApply: true,
    locale: {
        format: "DD/MM/YYYY HH:mm",
        customRangeLabel: "customRange",
        applyLabel: "Apply",
        cancelLabel: "Cancel",
        fromLabel: "from",
        toLabel: "to",
        daysOfWeek: [
            "Su",
            "Mo",
            "Tu",
            "We",
            "Thu",
            "Fr",
            "Sa",
        ],
        monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    maxSpan: {
        "months": 3
    },  
    minDate: moment(moment.now()).format("DD/MM/YYYY HH:mm"),
    timePicker24Hour: true,
});

export default generateTimeRangeConfig
