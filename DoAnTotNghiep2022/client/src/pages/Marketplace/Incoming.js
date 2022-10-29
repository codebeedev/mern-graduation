import React from "react";

const Incoming = props => {
    const {nft, setTempStatus} = props

    const [deadline, setDeadline] = React.useState(0)

    const handleSetDeadline = React.useCallback(() => {
        if(nft?.start_time){
            setDeadline(parseInt(nft?.start_time))
        }
    }, [nft])

    React.useEffect(() => {
        handleSetDeadline()
        return () => setDeadline(0)
    }, [handleSetDeadline])

    const [days, setDays] = React.useState(0);
	const [hours, setHours] = React.useState(0);
	const [minutes, setMinutes] = React.useState(0);
	const [seconds, setSeconds] = React.useState(0);

	const renderTime = (num) => {
        return num < 10 ? "0" + num : num;
    };

    const getTimeUntil = (deadline, now) => {
        const time = deadline - now;
        if (time < 0) {
            setDays(0);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
            setTempStatus("ONSALE")
        } else {
            setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
            setMinutes(Math.floor((time / 1000 / 60) % 60));
            setSeconds(Math.floor((time / 1000) % 60));
        }
    };
    
    React.useEffect(() => {
        const timer = setTimeout(() => {
            getTimeUntil(deadline, Date.now())
        }, 1000)
        return () => clearTimeout(timer)
    });

    return(
        <div className="incoming">
            {
                days > 0 ?
                <span>{days}D</span> : null
            }
            <span style={{paddingLeft: "4px"}}>{renderTime(hours)}:{renderTime(minutes)}:{renderTime(seconds)} </span>
        </div>
    )
}

export default Incoming