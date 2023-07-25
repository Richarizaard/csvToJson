import * as fs from 'fs'
import * as Papa from 'papaparse'
import { formatDate, calculateAge } from './utils/dateTime'
import Person from './types/person'
import Relative from './types/relative'
import CsvData from './types/csvData'

// Relationship map to dynamically extract/set relative relations
const RELATION_MAP: Record<string, string> = {
  Father: 'Father',
  Mother: 'Mother',
  Brother: 'Brother',
  Sister: 'Sister',
}

function csvToJson(csv: string): Person[] {
  // Create final list of extracted people and their metadata
  const people: Person[] = []

  // Parse csv data
  const { data } = Papa.parse<CsvData>(csv, { header: true })

  // Iterate through each person's metadata
  for (const row of data) {
    // Initialize new relatives for each person
    const relatives: Relative[] = []

    // Only iterate through relationship columns
    for (const column in RELATION_MAP) {
      const entry = row[column]

      // If entry is valid, save relationship entry
      if (entry !== 'null' && entry !== null) {
        const relativeName = entry.split(' ')
        relatives.push({
          // firstName will always be first
          firstName: relativeName[0],

          // lastName will always be last
          lastName: relativeName[relativeName.length - 1],

          // Look up respective relationship
          relationship: RELATION_MAP[column],
        })
      }
    }

    const personName = row.Name.split(' ')
    const person: Person = {
      // firstName will always be first
      firstName: personName[0],

      // lastName will always be last
      lastName: personName[personName.length - 1],
      birthday: formatDate(row.Birthday),
      age: calculateAge(row.Birthday, row.Died),
      relatives: relatives,
    }
    // Push to cumulated list of people
    people.push(person)
  }
  return people
}

const csv = fs.readFileSync('./data/input.csv', 'utf8')

const json = csvToJson(csv)

// Write the JSON data to a file
fs.writeFileSync('./data/output1.json', JSON.stringify(json, null, 2))

// console.log(JSON.stringify(json, null, 2))
// console.log(json)
