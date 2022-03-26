G_SWITCH_DICT = {
    True: 'ON',
    False: 'OFF'
}

class CGenWeb:
    def __init__(self):
        self.switchState = False

    def _doGenWebPage(self):
        return """
<html>
<head>
    <style>
        html {
            font-family: Arial;
            display: inline-block;
            margin: 0px auto;
            text-align: center;
        }
        .buttonOn {
            background-color: """ + self.getSwitchOnStatus()['color'] + """
            color: white;
            padding: 80px 200px;
            text-align: center;
            display: inline-block;
            font-size: 80px;
            margin: 8px 2px;
            cursor: pointer;
        }
        .buttonOff {
            background-color: """ + self.getSwitchOffStatus()['color'] + """
            color: white;
            padding: 80px 180px;
            text-align: center;
            display: inline-block;
            font-size: 80px;
            margin: 12px 2px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <h1>ESP01 Relay Controller :> </h1>
    <h2 style="color: """ + self.getSwitchStatusColor() + """ ">Switch Status: <strong>""" + G_SWITCH_DICT[self.switchState] + """</strong></h2>
    <p>
        <a href=\"?switch_on\"><button """ + self.getSwitchOnStatus()['disabled']  + """ class="buttonOn">Switch ON</button></a>
    </p>
    <p>
        <a href=\"?switch_off\"><button """ + self.getSwitchOffStatus()['disabled'] + """ class="buttonOff">Switch OFF</button></a>
    </p>
</body>
</html>
"""
    def getSwitchStatusColor(self):
        if self.switchState:
            return 'green'
        else:
            return 'red'


    def getSwitchOnStatus(self):
        if self.switchState:
            return { 'color': 'gray;', 'disabled': 'disabled' }
        else:
            return { 'color': 'green;', 'disabled': '' }

    def getSwitchOffStatus(self):
        if self.switchState:
            return { 'color': 'red;', 'disabled': '' }
        else:
            return { 'color': 'gray;', 'disabled': 'disabled' }

    def getWebPage(self, switchState):
        self.switchState = switchState
        # print('self.switchState =', self.switchState, '; G_SWITCH_DICT[self.switchState] =', G_SWITCH_DICT[self.switchState])
        return self._doGenWebPage()
