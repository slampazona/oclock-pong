import { isDayjsDate } from "src/validators";
import dayjs from 'dayjs';

describe('Validators', () => {

    it('should be a true if format date is good', () => {
        expect(isDayjsDate('YYYY-MM-DD')('2021-12-01')).toBe(true);
    })
    
    it('should be a true if format date is good with hours', () => {
        expect(isDayjsDate('YYYY-MM-DD HH:mm')('2021-12-01 20:30')).toBe(true);
    })

    it('should be false if format date not good', () => {
        expect(isDayjsDate('YYYY-MM')('2021-12-01')).toBe(false);
    })
    
    it('should be false if date does not exists', () => {
        expect(isDayjsDate('YYYY-MM-DD')('2021-02-31')).toBe(false);
    })
    
})
