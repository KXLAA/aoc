package helpers

import (
	"sort"

	"golang.org/x/exp/constraints"
)

func Filter[T any](array []T, fn func(T) bool) []T {
	var filteredArray []T
	for _, value := range array {
		if fn(value) {
			filteredArray = append(filteredArray, value)
		}
	}

	return filteredArray
}

func Map[T, V any](array []T, fn func(T) V) []V {
	mapped := make([]V, len(array))
	for index, value := range array {
		mapped[index] = fn(value)
	}

	return mapped
}

func Reduce[T, V any](array []T, fn func(V, T) V, initialValue V) V {
	acc := initialValue
	for _, value := range array {
		acc = fn(acc, value)
	}

	return acc
}

// Max value in an array
func Max[T constraints.Ordered](array []T) T {
	if len(array) == 0 {
		var zero T
		return zero
	}
	max := array[0]
	for _, value := range array {
		if max < value {
			max = value
		}
	}
	return max
}

// Min value in an array
func Min[T constraints.Ordered](array []T) T {
	if len(array) == 0 {
		var zero T
		return zero
	}

	min := array[0]

	for _, value := range array {
		if min > value {
			min = value
		}
	}

	return min
}

// Largest values in an array
func LargestValues(array []int, count int) []int {
	// descending
	sort.Sort(sort.Reverse(sort.IntSlice(array)))
	//Return only top count elements
	return array[:count]
}

func CheckError(e error) {
	if e != nil {
		panic(e)
	}
}
