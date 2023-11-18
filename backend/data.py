import numpy as np
import datetime

def synthetic_data_generation(samples: int, time: int, channels: int, start: datetime.time): 
    f = open("data.csv", "w")
    hour = start.hour
    minute = start.minute
    second = start.second
    today = datetime.date.today()

    f.writelines("Date,")
    for i in range(channels):
       f.writelines("Channel" + str(i + 1) + ",")
    f.writelines("\n")
    for i in range(time):
      for j in range(samples):
        temp = np.array2string(np.random.rand(channels), separator = ',', max_line_width=1000)
        temp = temp.replace(" ", "")
        newTime = datetime.time(hour, minute, second)
        f.writelines(str(today) + " " + str(newTime) + "," + temp[1:len(temp)-1] + "\n")
      second += 1
      if (second == 60):
        minute += 1
        second = 0
      if (minute == 60):
        hour += 1
        minute = 0
        
    f.close()


t = datetime.time(0, 0, 0)
hours = 3
minutes = int(hours * 60)
seconds = int(minutes * 60)
synthetic_data_generation(10, seconds, 10, t)

# Time Series Year Data Generation
"""def month_overflow(month: int, day: int):
    if (day == 31):
      if (month == 1 or month == 3 or month == 5 or month == 7
          or month == 8 or month == 10 or month == 12):
        return True
    elif (day == 30):
      if (month == 4 or month == 6 or month == 9 or month == 11):
        return True
    elif (day == 28 and month == 2):
      return True
    return False

def synthetic_data_generation(s: int, t: int, y: int): 
    f = open("data.csv", "w")
    day = 1;
    month = 1;
    f.writelines("Date,Value\n")
    for i in range(s):
        temp = np.array2string(np.random.rand(t), separator = ',', max_line_width=1000)
        temp = temp.replace(" ", "")
        
        f.writelines(str(y) + "-" + "{:02d}".format(month) + "-" + "{:02d}".format(day) + "," + temp[1:len(temp)-1] + "\n")
        if month_overflow(month, day):
          if month == 12:
            month = 1
            day = 1
            y += 1
          else:
            month += 1
            day = 1
        else:
          day += 1
    f.close()
    
    
    synthetic_data_generation(1825, 1, 2019)"""