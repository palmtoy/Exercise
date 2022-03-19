class CGenWeb:
  def __init__(self):
    self.html = """
<html>
<head>
    <style>
        html {
            font-family: Arial;
            display: inline-block;
            margin: 0px auto;
            text-align: center;
        }
        .btnSpeedUp {
            background-color: orange;
            color: black;
            padding: 30px 67px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnSlowDown {
            background-color: green;
            color: black;
            padding: 30px 53px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnLeftFront {
            background-color: #5882FA;
            color: black;
            padding: 30px 72px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            margin-left: 0px;
            cursor: pointer;
        }
        .btnForward {
            background-color: cyan;
            color: black;
            padding: 30px 76px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnRightFront {
            background-color: #5882FA;
            color: black;
            padding: 30px 56px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnCarLeft {
            background-color: cyan;
            color: black;
            padding: 30px 93px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnStop {
            background-color: red;
            color: black;
            padding: 30px 108px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnCarRight {
            background-color: cyan;
            color: black;
            padding: 30px 76px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnTurnLeft {
            background-color: #5882FA;
            color: black;
            padding: 30px 78px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnBack {
            background-color: cyan;
            color: black;
            padding: 30px 64px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnTurnRight {
            background-color: #5882FA;
            color: black;
            padding: 30px 60px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
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
    <h1>Mecanum Car Controller :></h1>
    <br/>
    <p>
        <a href=\"?speed_up\"><button class="btnSpeedUp">SpeedUp</button></a>
        <a href=\"?slow_down\"><button class="btnSlowDown">SlowDown</button></a>
    </p>
    <p>
        <a href=\"?left_front\"><button class="btnLeftFront">LeftFront</button></a>
        <a href=\"?car_forward\"><button class="btnForward">Forward</button></a>
        <a href=\"?right_front\"><button class="btnRightFront">RightFront</button></a>
    </p>
    <br/>
    <p>
        <a href=\"?car_left\"><button class="btnCarLeft">GoLeft</button></a>
        <a href=\"?car_stop\"><button class="btnStop">Stop</button></a>
        <a href=\"?car_right\"><button class="btnCarRight">GoRight</button></a>
    </p>
    <br/>
    <p>
        <a href=\"?turn_left\"><button class="btnTurnLeft">TurnLeft</button></a>
        <a href=\"?car_backward\"><button class="btnBack">Backward</button></a>
        <a href=\"?turn_right\"><button class="btnTurnRight">TurnRight</button></a>
    </p>
</body>
</html>
"""

  def getWebPage(self):
    return self.html
    