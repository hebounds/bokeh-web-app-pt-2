import numpy as np

def month_overflow(month: int, day: int):
    if (month == 1 and day == 31):
      return True
    if (month == 2 and day == 28):
      return True
    if (month == 3 and day == 31):
      return True
    if (month == 4 and day == 30):
      return True
    if (month == 5 and day == 31):
      return True
    if (month == 6 and day == 30):
      return True
    if (month == 7 and day == 31):
      return True
    if (month == 8 and day == 31):
      return True
    if (month == 9 and day == 30):
      return True
    if (month == 10 and day == 31):
      return True
    if (month == 11 and day == 30):
      return True
    if (month == 12 and day == 31):
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

synthetic_data_generation(1825, 1, 2019)