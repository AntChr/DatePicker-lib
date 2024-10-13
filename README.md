# Basic Datepicker React

A datepicker component using react

No other third party libraries just only standard built-in Date objects

<a href="https://www.npmjs.com/package/datepicker-lib-ac"><img alt="npm" src="https://img.shields.io/npm/dw/datepicker-lib-ac"></a>
<a href="https://www.npmjs.com/package/datepicker-lib-ac"><img alt="npm" src="https://img.shields.io/npm/v/datepicker-lib-ac"></a>
<a href="https://www.npmjs.com/package/datepicker-lib-ac">
<img alt="Maintenance Status" src="https://img.shields.io/badge/maintenance-active-green.svg" />
</a>

## Installation

```
npm install datepicker-lib-ac
```

## Example

```js
import Datepicker from 'basic-datepicker-react'
import { useState } from 'react'

const Example = () => {
  const [startDate, setStartDate] = useState('')
  return (
    <DatePicker label="Start Date" selectedDate={startDate} onDateChange={(date) => setStartDate(date)} headerBackgroundColor="#0f659e" />
  )
}

export default Example
```