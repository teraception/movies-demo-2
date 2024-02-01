import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Dashboard() {
  const movies = [1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Typography variant="h2" style={{ fontWeight: "500" }}>
              Your movie list is empty
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10px",
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#2BD17E", height: "40px" }}
              >
                Add a new movie
              </Button>
            </div>
          </div>
        </div> */}
        <Container style={{ maxWidth: "1500px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <Typography variant="h3">My movies</Typography>
              <Button>Add new</Button>
            </div>
            <Button style={{ color: "white" }}>
              Logout
              <LogoutIcon />
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              width: "80vw"
            }}
          >
            {movies.map((val) => (
              <div key={val}>
                <Card
                  style={{
                    width: "230px",
                    height: "calc(100vh - 60vh)",
                    margin: "10px",
                    background: "#092C39",
                  }}
                >
                  <Card
                    style={{
                      margin: "7px",
                      height: "80%",
                      background: "grey",
                    }}
                  >
                    <img style={{ objectFit: "contain" }} />
                  </Card>
                  <div style={{ paddingLeft: "7px" }}>
                    <Typography style={{ color: "white", textOverflow:"ellipsis" }}>
                      Movie Name <br />
                      <Typography>
                      Movie Date
                    </Typography>
                    </Typography>
                    
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
