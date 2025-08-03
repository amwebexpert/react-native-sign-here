import { computeDistance } from './canvas.utils';

describe('computeDistance', () => {
  it('should compute distance between two points', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 3, y: 4 };
    
    const result = computeDistance({ p1, p2 });
    
    expect(result).toBe(5); // 3-4-5 triangle
  });

  it('should compute distance between two points with negative coordinates', () => {
    const p1 = { x: -1, y: -1 };
    const p2 = { x: 2, y: 2 };
    
    const result = computeDistance({ p1, p2 });
    
    expect(result).toBe(Math.sqrt(18)); // sqrt((2-(-1))² + (2-(-1))²) = sqrt(9 + 9) = sqrt(18)
  });

  it('should return 0 when both points are the same', () => {
    const p1 = { x: 5, y: 10 };
    const p2 = { x: 5, y: 10 };
    
    const result = computeDistance({ p1, p2 });
    
    expect(result).toBe(0);
  });

  it('should use default values when no parameters are provided', () => {
    const result = computeDistance({});
    
    expect(result).toBe(0); // distance between (0,0) and (0,0)
  });

  it('should use default values when only p1 is provided', () => {
    const p1 = { x: 3, y: 4 };
    
    const result = computeDistance({ p1 });
    
    expect(result).toBe(5); // distance between (3,4) and (0,0)
  });

  it('should use default values when only p2 is provided', () => {
    const p2 = { x: 3, y: 4 };
    
    const result = computeDistance({ p2 });
    
    expect(result).toBe(5); // distance between (0,0) and (3,4)
  });

  it('should handle decimal coordinates', () => {
    const p1 = { x: 1.5, y: 2.5 };
    const p2 = { x: 4.5, y: 6.5 };
    
    const result = computeDistance({ p1, p2 });
    
    expect(result).toBeCloseTo(5, 5); // sqrt((4.5-1.5)² + (6.5-2.5)²) = sqrt(9 + 16) = 5
  });

  it('should handle large numbers', () => {
    const p1 = { x: 1000, y: 2000 };
    const p2 = { x: 3000, y: 4000 };
    
    const result = computeDistance({ p1, p2 });
    
    expect(result).toBe(Math.sqrt(8000000)); // sqrt((3000-1000)² + (4000-2000)²) = sqrt(4000000 + 4000000)
  });

  it('should handle zero coordinates', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 0, y: 0 };
    
    const result = computeDistance({ p1, p2 });
    
    expect(result).toBe(0);
  });

  it('should handle horizontal distance only', () => {
    const p1 = { x: 0, y: 5 };
    const p2 = { x: 10, y: 5 };
    
    const result = computeDistance({ p1, p2 });
    
    expect(result).toBe(10);
  });

  it('should handle vertical distance only', () => {
    const p1 = { x: 5, y: 0 };
    const p2 = { x: 5, y: 10 };
    
    const result = computeDistance({ p1, p2 });
    
    expect(result).toBe(10);
  });

  it('should handle edge case with very small numbers', () => {
    const p1 = { x: 0.0001, y: 0.0001 };
    const p2 = { x: 0.0002, y: 0.0002 };
    
    const result = computeDistance({ p1, p2 });
    
    expect(result).toBeCloseTo(0.0001414213562373095, 10); // sqrt(0.0001² + 0.0001²)
  });

  it('should handle edge case with very large numbers', () => {
    const p1 = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER };
    const p2 = { x: Number.MAX_SAFE_INTEGER - 1, y: Number.MAX_SAFE_INTEGER - 1 };
    
    const result = computeDistance({ p1, p2 });
    
    expect(result).toBeCloseTo(Math.sqrt(2), 5); // sqrt(1² + 1²) = sqrt(2)
  });

  it('should verify the mathematical formula is correctly implemented', () => {
    // Test that the function correctly implements the distance formula: sqrt((x2-x1)² + (y2-y1)²)
    const p1 = { x: 1, y: 2 };
    const p2 = { x: 4, y: 6 };
    
    const result = computeDistance({ p1, p2 });
    
    // Manual calculation: sqrt((4-1)² + (6-2)²) = sqrt(3² + 4²) = sqrt(9 + 16) = sqrt(25) = 5
    expect(result).toBe(5);
  });
}); 