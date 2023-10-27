import numpy as np

def month_overflow(month: int, day: int):
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

synthetic_data_generation(1825, 1, 2019)