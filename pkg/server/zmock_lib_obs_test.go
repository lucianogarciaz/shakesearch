// Code generated by moq; DO NOT EDIT.
// github.com/matryer/moq

package server_test

import (
	"context"
	"github.com/lucianogarciaz/kit/obs"
	"sync"
)

// Ensure, that ObserverMock does implement obs.Observer.
// If this is not the case, regenerate this file with moq.
var _ obs.Observer = &ObserverMock{}

// ObserverMock is a mock implementation of obs.Observer.
//
//	func TestSomethingThatUsesObserver(t *testing.T) {
//
//		// make and configure a mocked obs.Observer
//		mockedObserver := &ObserverMock{
//			CountFunc: func(ctx context.Context, name string, value float64, tags ...obs.Tag) error {
//				panic("mock out the Count method")
//			},
//			GaugeFunc: func(ctx context.Context, name string, value float64, tags ...obs.Tag) error {
//				panic("mock out the Gauge method")
//			},
//			HistogramFunc: func(ctx context.Context, name string, value float64, tags ...obs.Tag) error {
//				panic("mock out the Histogram method")
//			},
//			LogFunc: func(level obs.LogLevel, message string, payload ...obs.PayloadEntry) error {
//				panic("mock out the Log method")
//			},
//		}
//
//		// use mockedObserver in code that requires obs.Observer
//		// and then make assertions.
//
//	}
type ObserverMock struct {
	// CountFunc mocks the Count method.
	CountFunc func(ctx context.Context, name string, value float64, tags ...obs.Tag) error

	// GaugeFunc mocks the Gauge method.
	GaugeFunc func(ctx context.Context, name string, value float64, tags ...obs.Tag) error

	// HistogramFunc mocks the Histogram method.
	HistogramFunc func(ctx context.Context, name string, value float64, tags ...obs.Tag) error

	// LogFunc mocks the Log method.
	LogFunc func(level obs.LogLevel, message string, payload ...obs.PayloadEntry) error

	// calls tracks calls to the methods.
	calls struct {
		// Count holds details about calls to the Count method.
		Count []struct {
			// Ctx is the ctx argument value.
			Ctx context.Context
			// Name is the name argument value.
			Name string
			// Value is the value argument value.
			Value float64
			// Tags is the tags argument value.
			Tags []obs.Tag
		}
		// Gauge holds details about calls to the Gauge method.
		Gauge []struct {
			// Ctx is the ctx argument value.
			Ctx context.Context
			// Name is the name argument value.
			Name string
			// Value is the value argument value.
			Value float64
			// Tags is the tags argument value.
			Tags []obs.Tag
		}
		// Histogram holds details about calls to the Histogram method.
		Histogram []struct {
			// Ctx is the ctx argument value.
			Ctx context.Context
			// Name is the name argument value.
			Name string
			// Value is the value argument value.
			Value float64
			// Tags is the tags argument value.
			Tags []obs.Tag
		}
		// Log holds details about calls to the Log method.
		Log []struct {
			// Level is the level argument value.
			Level obs.LogLevel
			// Message is the message argument value.
			Message string
			// Payload is the payload argument value.
			Payload []obs.PayloadEntry
		}
	}
	lockCount     sync.RWMutex
	lockGauge     sync.RWMutex
	lockHistogram sync.RWMutex
	lockLog       sync.RWMutex
}

// Count calls CountFunc.
func (mock *ObserverMock) Count(ctx context.Context, name string, value float64, tags ...obs.Tag) error {
	if mock.CountFunc == nil {
		panic("ObserverMock.CountFunc: method is nil but Observer.Count was just called")
	}
	callInfo := struct {
		Ctx   context.Context
		Name  string
		Value float64
		Tags  []obs.Tag
	}{
		Ctx:   ctx,
		Name:  name,
		Value: value,
		Tags:  tags,
	}
	mock.lockCount.Lock()
	mock.calls.Count = append(mock.calls.Count, callInfo)
	mock.lockCount.Unlock()
	return mock.CountFunc(ctx, name, value, tags...)
}

// CountCalls gets all the calls that were made to Count.
// Check the length with:
//
//	len(mockedObserver.CountCalls())
func (mock *ObserverMock) CountCalls() []struct {
	Ctx   context.Context
	Name  string
	Value float64
	Tags  []obs.Tag
} {
	var calls []struct {
		Ctx   context.Context
		Name  string
		Value float64
		Tags  []obs.Tag
	}
	mock.lockCount.RLock()
	calls = mock.calls.Count
	mock.lockCount.RUnlock()
	return calls
}

// Gauge calls GaugeFunc.
func (mock *ObserverMock) Gauge(ctx context.Context, name string, value float64, tags ...obs.Tag) error {
	if mock.GaugeFunc == nil {
		panic("ObserverMock.GaugeFunc: method is nil but Observer.Gauge was just called")
	}
	callInfo := struct {
		Ctx   context.Context
		Name  string
		Value float64
		Tags  []obs.Tag
	}{
		Ctx:   ctx,
		Name:  name,
		Value: value,
		Tags:  tags,
	}
	mock.lockGauge.Lock()
	mock.calls.Gauge = append(mock.calls.Gauge, callInfo)
	mock.lockGauge.Unlock()
	return mock.GaugeFunc(ctx, name, value, tags...)
}

// GaugeCalls gets all the calls that were made to Gauge.
// Check the length with:
//
//	len(mockedObserver.GaugeCalls())
func (mock *ObserverMock) GaugeCalls() []struct {
	Ctx   context.Context
	Name  string
	Value float64
	Tags  []obs.Tag
} {
	var calls []struct {
		Ctx   context.Context
		Name  string
		Value float64
		Tags  []obs.Tag
	}
	mock.lockGauge.RLock()
	calls = mock.calls.Gauge
	mock.lockGauge.RUnlock()
	return calls
}

// Histogram calls HistogramFunc.
func (mock *ObserverMock) Histogram(ctx context.Context, name string, value float64, tags ...obs.Tag) error {
	if mock.HistogramFunc == nil {
		panic("ObserverMock.HistogramFunc: method is nil but Observer.Histogram was just called")
	}
	callInfo := struct {
		Ctx   context.Context
		Name  string
		Value float64
		Tags  []obs.Tag
	}{
		Ctx:   ctx,
		Name:  name,
		Value: value,
		Tags:  tags,
	}
	mock.lockHistogram.Lock()
	mock.calls.Histogram = append(mock.calls.Histogram, callInfo)
	mock.lockHistogram.Unlock()
	return mock.HistogramFunc(ctx, name, value, tags...)
}

// HistogramCalls gets all the calls that were made to Histogram.
// Check the length with:
//
//	len(mockedObserver.HistogramCalls())
func (mock *ObserverMock) HistogramCalls() []struct {
	Ctx   context.Context
	Name  string
	Value float64
	Tags  []obs.Tag
} {
	var calls []struct {
		Ctx   context.Context
		Name  string
		Value float64
		Tags  []obs.Tag
	}
	mock.lockHistogram.RLock()
	calls = mock.calls.Histogram
	mock.lockHistogram.RUnlock()
	return calls
}

// Log calls LogFunc.
func (mock *ObserverMock) Log(level obs.LogLevel, message string, payload ...obs.PayloadEntry) error {
	if mock.LogFunc == nil {
		panic("ObserverMock.LogFunc: method is nil but Observer.Log was just called")
	}
	callInfo := struct {
		Level   obs.LogLevel
		Message string
		Payload []obs.PayloadEntry
	}{
		Level:   level,
		Message: message,
		Payload: payload,
	}
	mock.lockLog.Lock()
	mock.calls.Log = append(mock.calls.Log, callInfo)
	mock.lockLog.Unlock()
	return mock.LogFunc(level, message, payload...)
}

// LogCalls gets all the calls that were made to Log.
// Check the length with:
//
//	len(mockedObserver.LogCalls())
func (mock *ObserverMock) LogCalls() []struct {
	Level   obs.LogLevel
	Message string
	Payload []obs.PayloadEntry
} {
	var calls []struct {
		Level   obs.LogLevel
		Message string
		Payload []obs.PayloadEntry
	}
	mock.lockLog.RLock()
	calls = mock.calls.Log
	mock.lockLog.RUnlock()
	return calls
}
