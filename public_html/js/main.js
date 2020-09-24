document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        const socket = io.connect("http://127.0.0.1:81");
        let startTime = Date.now() / 1000;
        let usage = [];
        let labels = [];
        let ctx = document.getElementById("chart");
        socket.on("ram", data => {
            if (usage.length > 10) {
                usage.splice(0, 1);
                labels.splice(0, 1);
            }
            usage.push(data);
            labels.push(((Date.now() / 1000) - startTime).toFixed(0) + "s (" + data + "MB)");
            let chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "RAM usage (MB)",
                        data: usage,
                        backgroundColor: "rgba(50, 150, 250, 0.2)",
                        borderColor: "rgba(0, 50, 250, 0.6)"
                    }]
                },
                options: {
                    animation: {
                        duration: 0
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                maxTicksLimit: 2000,
                                stepSize: 1000,
                                suggestedMax: 16000
                            }
                        }]
                    }
                }
            });
        });
    }
}