let in_types = {
    MQTT: {
        host: "127.0.0.1",
        port: 1883,
        clientId: "rulex",
        username: "rulex",
        password: "rulex"
    },
    HTTP: {
        port: 1883
    },

    UDP: {
        port: 1883

    },

    COAP: {
        port: 1883

    },
    UART_MODULE: {
        "address": "uart1",
        "baudRate": 115200,
        "timeout": 5,
        "dataBits": 8,
        "parity": "N",
        "stopBits": 1

    },
    MODBUS_TCP_MASTER: {
        "mode": "TCP",
        "timeout": 10,
        "slaverId": 1,
        "frequency": 3,
        "rtuConfig": {
            "uart": "TCP",
            "baudRate": 115200
        },
        "tcpConfig": {
            "ip": "127.0.0.1",
            "port": 502
        },
        "registerParams": [
            {
                "function": 3,
                "address": 0,
                "quantity": 10
            }
        ]

    },
    MODBUS_RTU_MASTER: {
        "mode": "RTU",
        "timeout": 10,
        "slaverId": 1,
        "frequency": 3,
        "rtuConfig": {
            "uart": "TCP",
            "baudRate": 115200
        },
        "tcpConfig": {
            "ip": "127.0.0.1",
            "port": 502
        },
        "registerParams": [
            {
                "function": 3,
                "address": 0,
                "quantity": 10
            }
        ]

    },
    SNMP_SERVER: {
        "frequency": 5,
        "timeout": 3,
        "targets": [
            {
                "target": "127.0.0.1",
                "port": 161,
                "transport": "udp",
                "community": "public",
                "version": 3,
                "dataModels": []
            }
        ]

    }
}
export default in_types
