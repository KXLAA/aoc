package main

import (
	"fmt"
	"strconv"
	"strings"
)

type Return struct {
	Largest      int
	LargestThree []int
}

func countCalories(calories string) *Return {
	group := Map(strings.Split(calories, "\n\n"),
		func(item string) []string {
			return strings.Split(item, "\n")
		})

	toNumber := Map(group, func(item []string) []int {
		return Map(item, func(val string) int {
			value, _ := strconv.Atoi(val)
			return value
		})
	})

	sum := Map(toNumber, func(item []int) int {
		return Reduce(item, func(acc, cur int) int {
			return acc + cur
		}, 0)
	})

	//max
	max := Max(sum)

	//largest three
	topThree := LargestValues(sum, 3)

	fmt.Println(topThree)

	return &Return{
		Largest:      max,
		LargestThree: topThree,
	}
}
