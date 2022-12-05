package day1

import (
	"fmt"
	"strconv"
	"strings"

	_ "embed"

	"github.com/KXLAA/aoc/helpers"
)

type returnValue struct {
	Largest      int
	LargestThree []int
}

//go:embed input.txt
var calories []byte

func CountCalories() *returnValue {
	//https://stackoverflow.com/questions/40632802/how-to-convert-byte-array-to-string-in-go
	formattedInput := string(calories[:])

	group := helpers.Map(strings.Split(formattedInput, "\n\n"),
		func(item string) []string {
			return strings.Split(item, "\n")
		})

	toNumber := helpers.Map(group, func(item []string) []int {
		return helpers.Map(item, func(val string) int {
			value, _ := strconv.Atoi(val)
			return value
		})
	})

	sum := helpers.Map(toNumber, func(item []int) int {
		return helpers.Reduce(item, func(acc, cur int) int {
			return acc + cur
		}, 0)
	})

	answer := &returnValue{
		Largest:      helpers.Max(sum),
		LargestThree: helpers.LargestValues(sum, 3),
	}

	fmt.Println(answer)

	return answer

}
