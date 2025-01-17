import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Notifications,
  Person,
  Dashboard as DashboardIcon,
  School,
  Assignment,
  DateRange,
  ExitToApp,
  Settings,
  CheckCircle,
  Schedule,
  TrendingUp,
  People,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}));

const drawerWidth = 240;

const Home = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    coursesCompleted: 12,
    assignmentsPending: 5,
    attendance: 85,
    upcomingExams: 3,
    totalStudents: 450,
    activeUsers: 280,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3003/api/student', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        handleLogout();
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/home' },
    { text: 'Courses', icon: <School />, path: '/courses' },
    { text: 'Assignments', icon: <Assignment />, path: '/assignments' },
    { text: 'Schedule', icon: <DateRange />, path: '/schedule' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const StatCard = ({ title, value, icon, color }) => (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Avatar sx={{ backgroundColor: color }}>
            {icon}
          </Avatar>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
      </CardContent>
    </StyledCard>
  );

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '64px',
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px',
          marginLeft: isDrawerOpen ? `${drawerWidth}px` : 0,
          transition: 'margin 0.2s',
        }}
      >
        <Container maxWidth="lg">
          <StyledPaper elevation={3}>
            <StyledAvatar>
              <Person sx={{ fontSize: 30 }} />
            </StyledAvatar>
            <Typography variant="h4" gutterBottom>
              Welcome back, {userData?.username}!
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Let's continue your learning journey
            </Typography>
          </StyledPaper>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Courses Completed"
                value={stats.coursesCompleted}
                icon={<CheckCircle />}
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Assignments Pending"
                value={stats.assignmentsPending}
                icon={<Assignment />}
                color="#ff9800"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Attendance Rate"
                value={`${stats.attendance}%`}
                icon={<Schedule />}
                color="#2196f3"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Upcoming Exams"
                value={stats.upcomingExams}
                icon={<DateRange />}
                color="#f44336"
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={8}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Completed Introduction to React" 
                        secondary="2 hours ago"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Assignment color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="New Assignment: Advanced JavaScript" 
                        secondary="1 day ago"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><TrendingUp color="info" /></ListItemIcon>
                      <ListItemText 
                        primary="Quiz Score: 95% in Web Development" 
                        secondary="2 days ago"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Class Statistics
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Total Students
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <People color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">{stats.totalStudents}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Active Users
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Person color="success" sx={{ mr: 1 }} />
                      <Typography variant="h6">{stats.activeUsers}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;