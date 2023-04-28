import sys
import math
input_string = '''3
10.00
20.00
30.00
4
15.00
15.01
3.00
3.01
0'''

input_string2 = '''1
10.00
0'''

output_string = '''$10.00
$11.99
'''

input = ''
inputs = []
while (input != '0'):
    input = sys.stdin.readline().strip()
    inputs.append(input)

inputs = '\n'.join(inputs)


def solution(input):
    lines = input.split('\n')
    students = []
    money_list = []
    group_count = -1
    results = []

    for line in lines:
        if (line.find('.') == -1):
            if (line == '0'):
                continue
            group_count += 1
            students.append(int(line))
            continue

        try:
            money_list[group_count].append(int(100 * float(line)))
        except:
            money_list.append([])
            money_list[group_count].append(int(100 * float(line)))

    money_sum = []
    money_mean = []

    for moneys in money_list:
        sum = 0
        for money in moneys:
            sum += money
        money_sum.append(sum)

    for idx, sum in enumerate(money_sum):
        money_mean.append(math.floor(sum / students[idx]))

    for idx, moneys in enumerate(money_list):
        plus = 0
        minus = 0
        mean = money_mean[idx]
        updowns = []
        for money in moneys:
            if (money > mean):
                updowns.append(True)
                minus += money - mean
            else:
                updowns.append(False)
                plus += mean - money

        while (plus < minus):
            for idx, updown in enumerate(updowns):
                if (updown):
                    updowns[idx] = False
                    minus -= 1
                    continue
            break

        result = '$%.2f' % (minus / 100)
        results.append(result)

    return '\n'.join(results)


print(solution(inputs))
