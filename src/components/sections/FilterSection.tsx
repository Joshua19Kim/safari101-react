import React from 'react';
import {
    Box,
    Slider,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel, useMediaQuery
} from '@mui/material';
import theme from "../../assets/style/theme";
import { Grid } from '@mui/material';

interface FilterSectionProps {
    trips: Trip[];
    selectedTypes: string[];
    durationRange: number[];
    onDurationChange: (min: number, max: number) => void;
    onTripTypeChange: (selectedTypes: string[]) => void;
    onSortChange: (option: SortOption) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
                                                         trips,
                                                         selectedTypes,
                                                         durationRange,
                                                         onDurationChange,
                                                         onTripTypeChange,
                                                         onSortChange,
                                                     }) => {
    const sortOptions: SortOption[] = [
        { label: 'Duration (Low to High)', field: 'duration', order: 'asc' },
        { label: 'Duration (High to Low)', field: 'duration', order: 'desc' },
        { label: 'Price (Low to High)', field: 'cost', order: 'asc' },
        { label: 'Price (High to Low)', field: 'cost', order: 'desc' },
    ];

    const [currentSort, setCurrentSort] = React.useState<string>('');
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    // Get min and max durations from trips
    const durations = trips.map(trip => trip.duration);
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);

    // Get unique trip types from all trips
    const allTripTypes = Array.from(
        new Set(
            trips.flatMap(trip =>
                trip.tripType.filter(type => type && type.trim() !== '')
            )
        )
    );
    const showTripTypes = allTripTypes.length > 0;

    // Handle duration slider change
    const handleDurationChange = (event: Event, newValue: number | number[]) => {
        const range = newValue as number[];
        onDurationChange(range[0], range[1]);
    };

    // Handle checkbox changes
    const handleTripTypeChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedTypes = event.target.checked
            ? [...selectedTypes, type]
            : selectedTypes.filter(t => t !== type);

        onTripTypeChange(newSelectedTypes);
    };
    const handleSortChange = (event: any) => {
        const value = event.target.value;
        setCurrentSort(value);
        const selectedSort = sortOptions.find(option =>
            `${option.field}-${option.order}` === value
        );
        if (selectedSort) {
            onSortChange(selectedSort);
        }
    };

    return (
        <Box sx={{
            width: '100%',
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            ml: '1rem',
            mr: '1rem',
        }}>
            <Box sx={{mb:'1rem',}}>
                <FormControl fullWidth size="small">
                    <InputLabel
                        sx={{
                            '&.Mui-focused': {
                                color: 'inherit'
                            }
                        }}
                    >Sort By</InputLabel>
                    <Select
                        value={currentSort}
                        label="Sort By"
                        onChange={handleSortChange}
                        sx={{
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme => theme.palette.customButtonColor.main,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme => theme.palette.customButtonColor.main,
                            },
                            '.MuiSelect-select': {
                                color: theme => currentSort ? theme.palette.customButtonColor.main : 'inherit',
                            }
                        }}
                    >
                        {sortOptions.map((option) => (
                            <MenuItem
                                key={`${option.field}-${option.order}`}
                                value={`${option.field}-${option.order}`}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {/* Duration Slider */}
            <Box>
                <Typography
                    gutterBottom
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: '1.3rem'
                    }}
                >
                    Travel Duration
                </Typography>
                <Box sx={{ px: 1, width: '90%', margin: '0 auto' }}>
                    <Slider
                        value={durationRange}
                        onChange={handleDurationChange}
                        valueLabelDisplay="auto"
                        sx={{color:theme.palette.customButtonColor.main}}
                        min={minDuration}
                        max={maxDuration}
                        marks={[
                            { value: minDuration, label: `${minDuration} days` },
                            { value: maxDuration, label: `${maxDuration} days` }
                        ]}
                    />
                </Box>
            </Box>

            {/* Trip Type Checkboxes */}
            {showTripTypes && (
                <Box>
                    <Typography
                        gutterBottom
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            fontSize: '1.3rem'
                        }}
                    >
                        Type
                    </Typography>
                    <FormGroup sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}>
                        {allTripTypes.map((type) => (
                            <FormControlLabel
                                key={type}
                                control={
                                    <Checkbox
                                        checked={selectedTypes.includes(type)}
                                        onChange={handleTripTypeChange(type)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 28,
                                                transition: 'all 0.2s',
                                            },
                                            '&.Mui-checked': {
                                                '& .MuiSvgIcon-root': {
                                                    color: theme.palette.customButtonColor.main,
                                                }
                                            },
                                            '&:hover .MuiSvgIcon-root': {
                                                transform: 'scale(1.1)'
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        transition: 'all 0.2s',
                                        backgroundColor: selectedTypes.includes(type)
                                            ? `${theme.palette.customButtonColor.light}20`
                                            : 'transparent',
                                        '&:hover': {
                                            backgroundColor: `${theme.palette.customButtonColor.light}10`,
                                        }
                                    }}>
                                        <Typography sx={{
                                            fontWeight: selectedTypes.includes(type) ? 600 : 400,
                                            transition: 'all 0.2s',
                                            color: selectedTypes.includes(type)
                                                ? theme.palette.customButtonColor.main
                                                : 'inherit'
                                        }}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </Typography>
                                    </Box>
                                }
                                sx={{
                                    margin: 0,
                                    width: '100%',
                                    '&:hover': {
                                        cursor: 'pointer',
                                    }
                                }}
                            />
                        ))}
                    </FormGroup>
                </Box>
            )}

        </Box>
    );
};

export default FilterSection;